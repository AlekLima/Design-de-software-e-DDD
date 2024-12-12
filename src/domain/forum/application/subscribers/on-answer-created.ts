import { DomainEvents } from "@/core/events/domain-events"
import { AnswerCreatedEvent } from "../../enterprise/entities/events/answer-created-event"
import { EventHandler } from "@/core/events/event-handler"

export class OnAnswerCreated implements EventHandler {
    constructor() {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name)
    }

    private async sendNewAnswerNotification({ answer }:AnswerCreatedEvent) {

    }
}