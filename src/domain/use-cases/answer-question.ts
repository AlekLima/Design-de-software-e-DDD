import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
    InstructorId: string
    questionId: string
    content: string
     
}

export class AnswerQuestionUseCase {
    execute({ InstructorId, questionId, content }: AnswerQuestionUseCaseRequest) {      
        const answer = new Answer({
            content,
            authorId: InstructorId,
            questionId,
        })

        return answer
    }
}

