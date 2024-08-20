import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionsCommentRepository } from '../repositories/question-comment-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
  }

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentRepository: QuestionsCommentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content
  }: CommentOnQuestionUseCaseRequest) : Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
        throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityID(authorId),
        questionId: new UniqueEntityID(questionId),
        content,
    })

    await this.questionCommentRepository.create(questionComment)
  }
}
