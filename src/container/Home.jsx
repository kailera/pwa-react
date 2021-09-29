import React, {memo} from 'react';
import { useEffect, useState } from 'react';
import { Row , Col} from 'antd';
import Economy from './components/Economy';
import Technology from './components/Technology';
import World from './components/World';

import Api from '../api';

const Home = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNews = (articles) =>{
        setLoading(false);
        setNews({
            world: articles[0]?.value.value,
            economy: articles[1]?.value.value,
            technology: articles[2]?.value.value,
        })
    }

    useEffect(() => {
        setLoading(true)
        Promise.allSettled([
            Api.getNews('world'),
            Api.getNews('economy'),
            Api.getNews('technology')
        ])
        .then(handleNews)
    },[])

    if(loading) return <div>Carregando</div>


    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24} md={16}> 
                    <h1>Economia</h1>
                    <Economy values = {news?.economy}/>
                </Col>
            
                <Col span={24} md={8}>
                    <h1>Tecnologia</h1>
                    <Technology values={news?.technology}/>
                </Col>
            </Row>
            
            <hr/>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <h1>Mundo</h1>
                    <World values={news?.world}/>
                </Col>
            </Row>
        </div>
    )
}

export default memo (Home);