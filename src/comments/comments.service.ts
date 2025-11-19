import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User): Promise<Comment> {
    const existingComment = await this.commentRepository.findOne({
      where: {
        user: { id: user.id },
        product: { id: createCommentDto.productId }
      }
    });

    if (existingComment) {
      throw new ConflictException('You have already commented on this product');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      user: { id: user.id },
      product: { id: createCommentDto.productId }
    });

    return this.commentRepository.save(comment);
  }

  // Admin: todos los comentarios de un producto
  async findByProduct(productId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  // Admin todos los comentarios hechos por un usuario
  async findByUser(userId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
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

    return this.commentRepository.save({
      ...comment,
      ...updateCommentDto
    });
  }

  async remove(id: number, user: User): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (user.role !== 'admin' && comment.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentRepository.softRemove(comment);
  }
}