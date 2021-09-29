import React, {memo} from "react";
import PropTypes from 'prop-types';
import { Row, Col} from 'antd';
import { useHistory } from 'react-router-dom';
import { createMarkup } from "../../utils";

const Technology  = ({values})=>{
    const history = useHistory()

    const renderImg = ({image, description}) => <img src={image.url} alt={description} width="100%"/>

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)}/>
    

    const openPost = (id) =>{
        history.push(`/technology/${id}`)
    }

    const renderPost = (post, index)=>{
        const {title, image, description, id} = post;
        return(
            <Col span={12} md={6} key={`post-${index}`}>
                <article onClick={()=>openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML = {createMarkup(title)}/>
                    </p>
                    {image.url && renderImg({image, description})}
                </article>
            </Col>
        )
    }

    return(
        <Row gutter={[16, 16]}>
            {values?.map(renderPost)}
        </Row>
    )
}

Technology.defaultProps = {
    values:[]
}

Technology.propTypes ={
    values:PropTypes.array.isRequired
}

export default memo(Technology)