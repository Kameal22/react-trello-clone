import { useState } from "react";

const useInputState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [limitedValue, setLimitedValue] = useState('');
    const [error, setError] = useState(initialValue);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleLimitedChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (limitedValue.length > 14) {
            setError("Cannot excide 14 characters");
        } else {
            setError("");
        }
        setLimitedValue(e.currentTarget.value)
    }

    const reset = () => {
        setValue('')
    }

    const handleError = (error: string) => {
        setError(error)
    }

    return [value, handleChange, limitedValue, handleLimitedChange, error, handleError, reset] as const;
}

export default useInputState;