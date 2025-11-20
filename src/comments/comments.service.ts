import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
        const existingComment = await this.commentRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: createCommentDto.productId }
            }
        });

        if (existingComment) {
            throw new ConflictException('You have already commented on this product');
        }

        const comment = this.commentRepository.create({
            content: createCommentDto.content,
            user: { id: userId },
            product: { id: createCommentDto.productId }
        });

        return this.commentRepository.save(comment);
    }

    async findByProduct(productId: number): Promise<Comment[]> {
        return this.commentRepository.find({
            where: { product: { id: productId } },
            relations: ['user', 'product'],
            order: { createdAt: 'DESC' }
        });
    }

    async findByUser(userId: number): Promise<Comment[]> {
        return this.commentRepository.find({
            where: { user: { id: userId } },
            relations: ['product', 'user'],
            order: { createdAt: 'DESC' }
        });
    }

    async update(id: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user']
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.user.id !== userId) {
            throw new ForbiddenException('You can only update your own comments');
        }

        if (updateCommentDto.content) {
            comment.content = updateCommentDto.content;
        }

        return this.commentRepository.save(comment);
    }

    async remove(id: number, userId: number, userRole: string): Promise<void> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user']
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (userRole !== Role.ADMIN && comment.user.id !== userId) {
            throw new ForbiddenException('You can only delete your own comments');
        }

        await this.commentRepository.softRemove(comment);
    }
}