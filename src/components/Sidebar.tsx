import styles from './Sidebar.module.css'
import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'

export function Sidebar () {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1 wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=50" alt="" />

            <div className={styles.profile}>
                <Avatar src="https://avatars.githubusercontent.com/u/114264328?v=4"/>
                <strong>Bruno Ramos</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                
                <a href="#"> <PencilLine className={styles.icon} size={20}/> Editar seu perfil</a>
            </footer>
        </aside>

    )
}