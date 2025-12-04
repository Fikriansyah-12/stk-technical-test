import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MoveMenuDto } from './dto/move-menu.dto';
import { ReorderMenuDto } from './dto/reorder-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepo: Repository<Menu>,
  ) {}

  async findAllTree() {
    const menus = await this.menuRepo.find({
      order: { order: 'ASC', createdAt: 'ASC' },
      relations: ['parent'],
    });

    const items = menus.map((m) => ({
      id: m.id,
      title: m.title,
      parentId: m.parent?.id ?? null,
      order: m.order,
    }));

    const nodeMap = new Map<string, any>();
    const roots: any[] = [];

    for (const item of items) {
      nodeMap.set(item.id, { ...item, children: [] });
    }

    for (const item of items) {
      const node = nodeMap.get(item.id);
      if (item.parentId) {
        const parentNode = nodeMap.get(item.parentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    const setDepth = (nodes: any[], depth: number) => {
      for (const n of nodes) {
        n.depth = depth;
        if (n.children?.length) setDepth(n.children, depth + 1);
      }
    };
    setDepth(roots, 1);

    return roots;
  }

  async findOne(id: string) {
    const menu = await this.menuRepo.findOne({
      where: { id },
      relations: ['parent'],
    });
    if (!menu) throw new NotFoundException('Menu not found');

    const depth = await this.getDepth(menu);

    return {
      id: menu.id,
      title: menu.title,
      parentId: menu.parent?.id ?? null,
      depth,
      order: menu.order,
    };
  }

  private async getDepth(menu: Menu): Promise<number> {
    let depth = 1;
    let current = menu.parent;
    while (current) {
      depth++;
      current = (await this.menuRepo.findOne({
        where: { id: current.id },
        relations: ['parent'],
      }))?.parent;
    }
    return depth;
  }

  async create(dto: CreateMenuDto) {
    let parent: Menu | null = null;

    if (dto.parentId) {
      parent = await this.menuRepo.findOne({ where: { id: dto.parentId } });
      if (!parent) throw new BadRequestException('Parent not found');
    }

  const where = parent
  ? { parent: { id: parent.id } }
  : { parent: IsNull() };

const lastSibling = await this.menuRepo.findOne({
  where,
  order: { order: 'DESC' },
});

    const menu = this.menuRepo.create({
      title: dto.title,
      parent: parent ?? null,
      order: lastSibling ? lastSibling.order + 1 : 0,
    });

    return this.menuRepo.save(menu);
  }

  async update(id: string, dto: UpdateMenuDto) {
    const menu = await this.menuRepo.findOne({
      where: { id },
      relations: ['parent'],
    });
    if (!menu) throw new NotFoundException('Menu not found');

    if (dto.title !== undefined) {
      menu.title = dto.title;
    }

    if (dto.parentId !== undefined) {
      let newParent: Menu | null = null;
      if (dto.parentId) {
        newParent = await this.menuRepo.findOne({ where: { id: dto.parentId } });
        if (!newParent) throw new BadRequestException('New parent not found');
      }
      menu.parent = newParent;
    }

    return this.menuRepo.save(menu);
  }

  async remove(id: string) {
    const menu = await this.menuRepo.findOne({ where: { id } });
    if (!menu) throw new NotFoundException('Menu not found');
    await this.menuRepo.remove(menu);
    return { success: true };
  }

  async move(id: string, dto: MoveMenuDto) {
    const menu = await this.menuRepo.findOne({
      where: { id },
      relations: ['parent'],
    });
    if (!menu) throw new NotFoundException('Menu not found');

    let newParent: Menu | null = null;
    if (dto.newParentId) {
      newParent = await this.menuRepo.findOne({ where: { id: dto.newParentId } });
      if (!newParent) throw new BadRequestException('New parent not found');
    }

    menu.parent = newParent;

   const where = newParent
  ? { parent: { id: newParent.id } }
  : { parent: IsNull() };

const lastSibling = await this.menuRepo.findOne({
  where,
  order: { order: 'DESC' },
});

    menu.order = lastSibling ? lastSibling.order + 1 : 0;

    return this.menuRepo.save(menu);
  }

  async reorder(id: string, dto: ReorderMenuDto) {
    const menu = await this.menuRepo.findOne({
      where: { id },
      relations: ['parent'],
    });
    if (!menu) throw new NotFoundException('Menu not found');

    menu.order = dto.newOrder;
    return this.menuRepo.save(menu);

  }
}
