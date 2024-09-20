import { Either, left, right } from '@/core/either'
import { QuestionsCommentRepository } from '../repositories/question-comment-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>


export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentRepository: QuestionsCommentRepository
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest) : Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
        return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
        return left(new NotAllowedError())
    }

    

    await this.questionCommentRepository.delete(questionComment)

    return right({})
  }
}
