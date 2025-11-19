import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import type { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @Auth(Role.USER)
    create(@Body() createCommentDto: CreateCommentDto, @ActiveUser() user: UserActiveInterface) {
        return this.commentsService.create(createCommentDto, user.sub);
    }

    @Get('product/:productId')
    @Auth(Role.ADMIN)
    findByProduct(@Param('productId') productId: string) {
        return this.commentsService.findByProduct(+productId);
    }

    @Get('user/:userId')
    @Auth(Role.ADMIN)
    findByUser(@Param('userId') userId: string) {
        return this.commentsService.findByUser(+userId);
    }

    @Patch(':id')
    @Auth(Role.USER)
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @ActiveUser() user: UserActiveInterface) {
        return this.commentsService.update(+id, updateCommentDto, user.sub);
    }

    @Delete(':id')
    @Auth(Role.USER)
    remove(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
        return this.commentsService.remove(+id, user.sub, user.role);
    }
}