import { useState } from "react";

const useInputState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const reset = () => {
        setValue('')
    }

    const handleError = (error: string) => {
        setError(error)
    }

    return [value, handleChange, error, handleError, reset] as const;
}

export default useInputState;