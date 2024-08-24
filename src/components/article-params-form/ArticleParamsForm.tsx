import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useClose } from '../../hooks/useClose';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({articleState, setArticleState}: ArticleParamsFormProps) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [params, setParams] = useState(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);

	useClose({
		isOpen: menuOpen,
		onclose: () => setMenuOpen(false),
		rootRef: formRef,
	});

	const formVisibility = () => {
		setMenuOpen(!menuOpen);
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(params);
		formVisibility();
	};

	const handleResetParams = (e: SyntheticEvent) => {
		setArticleState(defaultArticleState);
		setParams(defaultArticleState);
	};

	const handleApplyParams = (param: string, value: OptionType) => {
		setParams({
			...params,
			[param]: value,
		});
	};

	return (
		<>
			<ArrowButton onClick={formVisibility} isOpen={menuOpen} />
			<aside
				className={clsx(styles.container, menuOpen && styles.container_open)}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={handleSubmit}
					onReset={handleResetParams}>
					<Text as={'h2'} uppercase size={31} weight={800}>
						задайте партаметы
					</Text>
					<Select
						title='шрифт'
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(param) => handleApplyParams('fontFamilyOption', param)}
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={(param) => handleApplyParams('fontSizeOption', param)}
						title='размер шрифта'
					/>
					<Select
						title='цвет шрифта'
						selected={params.fontColor}
						options={fontColors}
						onChange={(param) => handleApplyParams('fontColor', param)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={(param) => handleApplyParams('backgroundColor', param)}
					/>
					<Select
						title='ширина контента'
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={(param) => handleApplyParams('contentWidth', param)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
