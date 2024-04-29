import { randomUUID } from "crypto"

interface InstructorProps {
    name: string
}

export class Instructor extends Entity {
   
    public name: string
    
    

    constructor (props: InstructorProps,  name: string, id?: string) {
        super(id)

        this.name = props.name
           
    }

}