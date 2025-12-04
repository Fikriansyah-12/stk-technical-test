import { Controller, Get, Post, Put, Delete, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MoveMenuDto } from './dto/move-menu.dto';
import { ReorderMenuDto } from './dto/reorder-menu.dto';

@ApiTags('menus')
@Controller('api/menus')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  @ApiOkResponse({ description: 'Get menu tree (all menus in hierarchical structure).' })
  getTree() {
    return this.service.findAllTree();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get single menu item by id.' })
  getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create new menu item.' })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() dto: CreateMenuDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update an existing menu item.' })
  update(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete menu item (and its children).' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/move')
  @ApiOkResponse({ description: 'Move menu item to a different parent.' })
  move(@Param('id') id: string, @Body() dto: MoveMenuDto) {
    return this.service.move(id, dto);
  }

  @Patch(':id/reorder')
  @ApiOkResponse({ description: 'Reorder menu item within same level.' })
  reorder(@Param('id') id: string, @Body() dto: ReorderMenuDto) {
    return this.service.reorder(id, dto);
  }
}
