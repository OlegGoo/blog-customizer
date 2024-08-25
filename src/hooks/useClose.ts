import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onclose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useClose = ({ isOpen, onclose, rootRef }: TUseClose) => {
	useEffect(() => {
		if (!isOpen) return;
		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onclose();
			}
		};

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onclose();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEsc);
		};
	}, [isOpen, onclose, rootRef]);
};
