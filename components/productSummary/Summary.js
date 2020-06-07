import React from 'react';
import { Box, Headline, FeatureLine, FeatureWrapper } from '../basic'

const getValueFromString = (value, key) => {
    var obj = JSON.parse(value);
    return obj[key];
}

const getValueFromObjectString = (value, key) => {
    var obj = JSON.parse(value);
    return obj[0][key];
}

const Summary = (props) => {
    let tmp_headline = '', tmp_features = [], tmp_bullet = '';
    if(props.metadata.length > 0) {
        console.log(props.metadata);
        props.metadata.map(field => {
            if(field.key === 'headline') tmp_headline = field.value;
            if(field.key === 'feature_1') tmp_features[0] = field.value;
            if(field.key === 'feature_2') tmp_features[1] = field.value;
            if(field.key === 'feature_3') tmp_features[2] = field.value;
            if(field.key === 'feature_4') tmp_features[3] = field.value;
            if(field.key === 'bullet_type') tmp_bullet = field.value;
        })
        tmp_headline = getValueFromString(tmp_headline, 'html');
        tmp_features[0] = getValueFromString(tmp_features[0], 'html');
        tmp_features[1] = getValueFromString(tmp_features[1], 'html');
        tmp_features[2] = getValueFromString(tmp_features[2], 'html');
        tmp_features[3] = getValueFromString(tmp_features[3], 'html');
        tmp_bullet = getValueFromObjectString(tmp_bullet, 'src');
    };   
    
    const headline = tmp_headline;
    const features = tmp_features;
    const bullet_url = tmp_bullet;
    
    return (
        <Box width={'50%'} m='auto'>
            <Headline dangerouslySetInnerHTML={{__html: headline}} />
            {features.length > 0 && <React.Fragment>
                {features.map(feature =><FeatureWrapper>
                    <Box>
                        <img src={bullet_url} />
                    </Box>
                    <FeatureLine dangerouslySetInnerHTML={{__html: feature}} />
                </FeatureWrapper>)}
            </React.Fragment>}
        </Box>
    )
}

export default Summary;