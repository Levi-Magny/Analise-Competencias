import { QuestionText } from ".."
import { useFormContext } from "../../contexts/formcontext"
import ementa from '../../data/ementa.json'


const Questions = () =>{
    const {formData, setFormData} = useFormContext()
    
    return (
        <QuestionText>{ementa[formData.materia][0]}</QuestionText>
    )
}

export default Questions;