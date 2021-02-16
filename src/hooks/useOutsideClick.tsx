import {useEffect} from 'react';

const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    action: Function,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            /* istanbul ignore else */
            if (ref.current && !ref.current.contains(event.target as Node)) {
                action();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [ref, action]);
};

export default useOutsideClick;
