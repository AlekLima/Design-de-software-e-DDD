import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createAt: Date
  updateAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createAt
  }

  get updatedAt() {
    return this.props.updateAt
  }

  private touch() {
    this.props.updateAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerCommentProps, 'createAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createAt: props.createAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
