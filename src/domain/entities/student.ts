
import { Entity} from "../../core/entities/entity"


interface StudentProps {
    name: string
}

export class Student extends Entity <StudentProps> {
   
    

    constructor (props: StudentProps,name: string, id?: string ) {
        super(props,id)
        
       
           
    }

}