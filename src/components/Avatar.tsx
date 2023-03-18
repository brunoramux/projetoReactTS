import styles from './Avatar.module.css';

interface AvatarProps {
    hasBorder?: boolean; // o ponto de interrogacao e para indicar que a propriedade nao e obrigatoria
    src: string;
    alt?: string;
}

export function Avatar({ hasBorder = true, src}: AvatarProps){
    return (
            <img className={hasBorder ? styles.avatar : styles.avatarNoBorder} src={src} alt='' />
            
    )
}