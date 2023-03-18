import { format, formatDistanceToNow } from 'date-fns'; //biblioteca para formatacao e trabalho com datas
import ptBR from 'date-fns/esm/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post(props: PostProps) {

    const [comments, setComments] = useState([
        
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(props.publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {locale: ptBR}) //funcao para formatar uma data. Vide documentacao do date-fns para formatos especificos

    const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {locale: ptBR, addSuffix: true}) //Funcao para calcular tempo entre uma data e a data de hoje

    function createNewComment (event: FormEvent){
        event.preventDefault()
        // const newCommentText = event.target.comment.value //conseguimos pegar dados de dentro do objeto do evento, que nesse caso e o form.
        setComments([...comments, newCommentText])
        // event.target.comment.value = '';
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment => { //metodo filter percorre o array retornando valores de acordo com condicao
            return comment != commentToDelete; //retorna apenas valores diferentes do comment que queremos deletar
        })
        setComments(commentsWithoutDeletedOne); //atualiza o array de comentarios com o novo array gerando acima
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo e obrigatorio'); //evento para alterar a mensagem de valor invalido
    }


    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={props.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{props.author.name}</strong>
                        <span>{props.author.role}</span>
                    </div>
                    
                </div>

                <time title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {
                    props.content.map(line => {
                        if(line.type == 'paragraph'){
                            return <p key={line.content}>{line.content}</p>
                        }else if(line.type == 'link'){
                            return <p key={line.content}><a href='#'>{line.content}</a></p>
                        }
                    })
                }

                <p><a href='#'>#novoprojeto</a> <a href='#'>#nlw</a> <a href='#'>#rocketseat</a></p>
            </div>

            <form onSubmit={createNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name='comment' 
                    onChange={handleNewCommentChange} //fica atualizando variavel com a informacao digitada
                    value={newCommentText}
                    placeholder='Deixe um comentario' 
                    required //required={true}
                    onInvalid={handleNewCommentInvalid} //chama funcao quando valor invalido
                />
                <footer>
                    <button type="submit" disabled={newCommentText.length == 0}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment deleteComment={deleteComment} key={comment} content={comment}/> //passamos a funcao deleteComment como parametro pois um item do componente Comment vai aciona-la
                })}

            </div>
        </article>
    )
}