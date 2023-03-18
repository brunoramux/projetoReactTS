import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    deleteComment: (comment: string) => void
}

export function Comment ({ content, deleteComment }: CommentProps){
    function handleDeleteComment(){
        deleteComment(content);
    }

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment() {
        setLikeCount(likeCount + 1);
    }


    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/114264328?v=4" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}> 
                            <strong>Bruno Ramos</strong>
                            <time title="11 de Maio as 08:50h"dateTime="2022-05-11 08:50:32">Cerca de 1hr atras</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar Comentario'>
                            <Trash size={20}/>
                        </button>
                    </header>

                    <p>
                        {content}
                    </p>
                </div>


                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={18}/>
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>

        </div>
    )
        
    
}
