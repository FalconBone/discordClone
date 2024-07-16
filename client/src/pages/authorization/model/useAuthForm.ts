import { useForm } from "react-hook-form"
import type { AuthFormValues } from "./types"


export const useAuthFrom = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = (data : AuthFormValues) => {
        
    }

    return  {register, handleSubmit: onSubmit, errors}
}