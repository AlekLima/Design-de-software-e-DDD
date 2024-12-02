import { PaginationParams } from "@/core/repositories/pagination-params"
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment"
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository"

export class inMemoryQuestionAttachmentRepository 
    implements  QuestionAttachmentsRepository 
{    
    public items: QuestionAttachment[] = []
  
    async findManyByQuestionId(questionId: string) {
        const questionAttachments = this.items
        .filter((item) => item.questionId.toString() === questionId,
    )
        

        return questionAttachments
    }

}