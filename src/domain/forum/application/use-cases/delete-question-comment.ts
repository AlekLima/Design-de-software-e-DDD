import { QuestionsCommentRepository } from '../repositories/question-comment-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}


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
        throw new Error('Question not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
        throw new Error('Not Allowed')
    }

    

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
