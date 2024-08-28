import React, { useState } from 'react';
import { TemplatePage } from 'templates/TemplatePage';
import s from './RegisterPage.module.scss';
import { SwordButton } from 'components/SwordButton';
import { SwordButtonAlt } from 'components/SwordButtonAlt';
import { SwordLoginFailed } from 'components/SwordLoginFailed';
import { Link, useNavigate } from 'react-router-dom';
import { PATHS } from 'config/paths';
import { SwordInput } from 'components/SwordInput';
import { FieldValues, useForm } from 'react-hook-form';
import { sendRequestPOST } from 'requests';

export const RegisterPage: React.FC = () => {
	const [isFailOpen, setIsFailOpen] = useState(false);
	const redirect = useNavigate();
	const { register, handleSubmit, watch } = useForm();
	const password = watch('password');

	async function sendRegisterRequest(data: FieldValues) {
		if (data.password !== data.confirmPassword) {
			setIsFailOpen(true);
			return;
		}
		let response = await sendRequestPOST(
			{ username: data.username, password: data.password },
			'users/register'
		);
		let result = await response.json();

		if (result.status) {
			redirect(PATHS.tournament);
			localStorage.setItem('token', result.token);
		} else {
			setIsFailOpen(true);
		}
	}

	return (
		<TemplatePage>
			<div className={s.fullDiv}>
				<div className={s.transDiv}>
					<h1 className={s.headerUp}>REJESTRACJA</h1>
					<h3 className={s.headerDown}>ADMINISTRATOR</h3>
					<form className={s.formContainer} onSubmit={handleSubmit(sendRegisterRequest)}>
						<div className={s.inputContainer}>
							<SwordInput placeholder="Nazwa użytkownika" {...register('username')} />
							<SwordInput type="password" placeholder="Hasło" {...register('password')} />
							<SwordInput type="password" placeholder="Potwierdź hasło" {...register('confirmPassword')} />
							<SwordLoginFailed isOpen={isFailOpen} />
						</div>
						<SwordButtonAlt type="submit">Zarejestruj się</SwordButtonAlt>
						<p className={s.signInCaption}>
							Masz już konto?{' '}
							<Link to={PATHS.loginAdmin}>
								<b>Zaloguj się</b>
							</Link>
						</p>
					</form>
				</div>
			</div>
		</TemplatePage>
	);
};