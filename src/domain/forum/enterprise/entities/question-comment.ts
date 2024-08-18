import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createAt: Date
  updateAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
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
    props: Optional<QuestionCommentProps, 'createAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createAt: props.createAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
