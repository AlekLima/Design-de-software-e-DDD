import { inMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { inMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from '@/test/factories/make-question'


let inMemoryQuestionRepository: inMemoryQuestionsRepository
let inMemoryAnswerRepository: inMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new inMemoryQuestionsRepository()
    inMemoryAnswerRepository = new inMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
        inMemoryQuestionRepository,
        inMemoryAnswerRepository
    )
  })

  it('should be able to choose the question  best answer', async () => {
    const question = makeQuestion()
    
    const answer = makeAnswer({
        questionId: question.id,
    })
    

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)



    await sut.execute({
      answerId:  answer.id.toString(),
      authorId:  question.authorId.toString(),
    })
    


    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
       
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
        authorId: new UniqueEntityID('author-1')
    })
    const answer = makeAnswer({
        questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)


    expect (() => {
      return sut.execute({
        answerId:  answer.id.toString(),
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)


  })
})