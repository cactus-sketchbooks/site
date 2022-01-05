import { React, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

import Header from '../../components/header/'
import Footer from '../../components/footer/'
import './style.scss';

import firebase from 'firebase/app'
import "firebase/database";
import 'firebase/storage';
import firebaseConfig from '../../FirebaseConfig.js'


export default function BlogAdm() {

    const [formData, setFormData] = useState({

        title: '',
        desc: '',
        imageUrl: '',
        authorPicture: '',
        content: '',
        author: '',
        hashtag: '',
        file: '',

    })

    const [dataAdm, setDataAdm] = useState([{}])
    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [postHashtags, setPostHashtags] = useState([])
    const [selectItemToDelete, setSelectItemToDelete] = useState('')
    const [paragraphs, setParagraphs] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [haveLogIn, setHaveLogIn] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [authorPicture, setAuthorPicture] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("posts");

        ref.get('/posts').then(function (snapshot) {

            if (snapshot.exists()) {
                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataAdm(temp)
            }

        })

    }, []);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("posts");

        var keys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    function sendPost() {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const id = firebase.database().ref().child('posts').push().key

        const date = new Date();

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        firebase.database().ref('posts/' + id).set({

            title: formData.title,
            id: id,
            desc: formData.desc,
            imageUrl: imageUrl,
            content: formData.content,
            author: formData.author,
            authorPicture: authorPicture,
            paragraphs: paragraphs,
            date: `${day}/${month}/${year}`,
            hashtags: postHashtags,
            file: file

        }).then(() => alert("Post enviado com sucesso"));

    }

    function handleInputChange(event) {

        const { name, value } = event.target
        setFormData({

            ...formData, [name]: value

        })

    }

    function setHashtag() {

        const hashtag = formData.hashtag

        postHashtags.push(hashtag)

        window.alert('Inserido com sucesso')

    }

    function handleSelectItemToDelete(event) {

        setSelectItemToDelete(event.target.value)

    }

    function deletePost() {

        firebase.database().ref('posts/' + dataKeysAdm[selectItemToDelete]).remove()
            .then(function (snapshot) {

                alert("Post excluido")

            })

    }

    function uploadImage(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('images/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setImageUrl(url))
            });

    }

    function uploadPicture(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('pictures/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setAuthorPicture(url))
            });

    }

    function uploadFile(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('files/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setFile(url))
            });

    }

    const [userIsLogged, setUserIsLogged] = useState(false);

    useEffect(() => {

        var userEmail = localStorage.getItem('userEmail')

        firebase.database().ref('admins').get('/admins')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email === userEmail)
                            setUserIsLogged(true)

                    })
                }
                else {
                    console.log("No data available");
                }
            })

    }, []);

    if (userIsLogged) {

        return (

            <section id='BlogAdmin'>

                <Header />

                <main id='mainBlogAdmin'>

                    <div className="tipsBlogAdmin">

                        <h1>Criar um artigo</h1>

                        <p>Dica: para escrever o artigo, recomendamos que utilize algum editor de texto (Word, bloco de notas, ou qualquer um de sua preferência) para escrever o conteúdo a ser publicado no artigo, e, após isso, copie e cole no campo de conteúdo abaixo.</p>

                    </div>

                    <form>

                        <fieldset>

                            <label htmlFor='title' >Título</label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                onChange={handleInputChange}
                            />

                            <label htmlFor='desc'>Resumo</label>
                            <input
                                type='text'
                                name='desc'
                                id='desc'
                                onChange={handleInputChange}
                            />

                            <label htmlFor='author'>
                                Nome do autor</label>
                            <input
                                type='text'
                                name='author'
                                id='author'
                                onChange={handleInputChange}
                            />

                            <label htmlFor='imageUrl'>
                                Url da imagem</label>
                            <input
                                type='file'
                                onChange={uploadImage}
                                accept="image/png, image/jpeg, image/gif"
                                placeholder='Imagem'
                            />

                            <label htmlFor='authorPicture'>
                                Foto do autor</label>
                            <input
                                type='file'
                                onChange={uploadPicture}
                                accept="image/png, image/jpeg"
                                placeholder='Foto do autor'
                            />

                            <label htmlFor='files'>
                                Inserir arquivo PDF/Imagem para download (o botão para download ficará no final do texto)</label>
                            <input
                                type='file'
                                name='files'
                                id='files'
                                accept="image/png, image/jpeg, application/pdf"
                                onChange={uploadFile}
                            />

                            <label htmlFor='hashtags'>
                                Hashtags/assuntos-chave</label>
                            <input
                                type='text'
                                name='hashtag'
                                id='hashtag'
                                onChange={handleInputChange}
                            />

                            <a className="btnAddHashtag" onClick={() => setHashtag()}>Inserir hashtag</a>

                            <div className="createdHashtags">

                                {postHashtags ? (

                                    postHashtags.map((item) => {

                                        return(

                                            <h4>{item}</h4>

                                        )

                                    })

                                ) : (

                                    <h4>aa</h4>

                                )}

                            </div>

                            <label htmlFor='content'>Conteúdo</label>
                            <textarea
                                type='text'
                                name='content'
                                id='content'
                                spellCheck
                                onChange={(event) => { setParagraphs(event.target.value) }}
                            />

                            <a className='sendButtonBlog' onClick={sendPost} >Enviar</a>

                        </fieldset>

                    </form>

                    <section id="defaultSectionAdmin">

                        <h2>Apagar artigo</h2>

                        <select onChange={handleSelectItemToDelete} >

                            <option>Selecione o item</option>

                            {dataAdm.map((item, index) => {

                                return (

                                    <option key={index} value={index} >{item.title}</option>

                                )

                            })}

                        </select>

                        <a className='sendButtonBlog' onClick={deletePost} >Apagar</a>

                    </section>

                </main>

                <Footer />

            </section>

        )
    }

    else {

        return (

            <a>AAAAAAAAAAAAAAAAA</a>

        )
    }

}
