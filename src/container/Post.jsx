import React, { memo, useEffect, useState, useCallback } from "react";
import { useHistory, useParams, Link } from 'react-router-dom';
import { Row, Col } from "antd";
import Api from "../api";
import Loading from '../components/Loading';
import Actions from './components/Actions';
import { createMarkup } from "../utils";
import './styles.css';

const Post = () =>{
    const { id, subject } = useParams();
    const [post, setPost] = useState({});
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleNews = useCallback((data)=>{
        setNews(data[0]?.value);
        setPost(data[1]?.value)
        setLoading(false)
    },[]);

    useEffect(()=>{
        setLoading(true);

        Promise.allSettled([
            Api.getNews(subject),
            Api.getNewsById(subject, id),
        ])
        .then(handleNews)

    },[id, subject, handleNews])

    const renderImg = ({image, description}) => <img src ={image.url} alt={description} width="75%"/>

    

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)}/>

    const openPost = (id) =>{
        history.push(`/${subject}/${id}`)
    }
    
    const renderPost = (post, index) => {
        const {id, title, description, image } = post;
        return(
            <Col span={12} key={`post-${index}`}>
                <article onClick={() => openPost(id )}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)}/>
                    </p>
                    {image?.url ? renderImg({image, description}) : renderDescription(description)}
                </article>
            </Col>
        )
    }

    const { title, image, description, body, datePublished } = post

    if (loading) return <Loading/>

    if (!post?.id) return

    return(
    <>  
        <Link to="/">Back</Link>
        <Actions post={post} subject={subject} />
        <Row gutter={[16, 16]}>
            <Col span={24} md={26}>
                <p>{datePublished}</p>
                <h1 dangerouslySetInnerHTML={createMarkup(title)}/>
                {image && renderImg({image, description})}
                <p className="text" dangerouslySetInnerHTML={createMarkup(description)}/>
                <hr/>
                <p className="text" dangerouslySetInnerHTML = {createMarkup(body)}/>
            </Col>
            <Col span={24} md={8}>
                <Row gutter={[16, 16]}>
                    {news?.value?.map(renderPost)}
                </Row>
            </Col>
        </Row> 
    </>
    )
}

export default memo (Post);