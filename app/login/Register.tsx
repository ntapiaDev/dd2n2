'use client';

import styles from './Register.module.css';
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Login from "./Login";
import { USER_REGEX, PASSWORD_REGEX } from './regex';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [toastId, setToastId] = useState('');
    
    let disabled = !USER_REGEX.test(username) || !PASSWORD_REGEX.test(password) || (password !== repeat);

    const { mutate } = useMutation(
        async ({ username, password }: { username: string, password: string }) => await axios.post('api/user/', { username, password }), {
            onError: (error) => {
                if (error instanceof AxiosError) toast.error(error.response?.data, { id: toastId });
            },
            onSuccess: (data) => {
                signIn();
            }
        }
    )

    const addUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setToastId(toast.loading('Enregistrement en cours...'));
        mutate({ username, password });
    }

    return (
        <>
            <div>Enregistrement</div>
            <form onSubmit={addUser}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Mot de passe</label>
                <input type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="repeat">Confirmation</label>
                <input type="password"
                    id="repeat"
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)} />
                <button type="submit" disabled={disabled}>Envoyer</button>
            </form>
            <p>Déjà un compte ?</p><Login />
        </>
    )
}
