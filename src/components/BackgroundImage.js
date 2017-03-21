import React from 'react';

const BackgroundImage = (props) => {
        return (
            <div className="background-image-component" style={{ 
                position: 'absolute',
                width: '100%',
                height: `${ props.height }px`,
                zIndex: -9999,
                backgroundImage: `url(${ props.url })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: props.opacity,
                filter: 'grayscale(100%) contrast(100%) brightness(200%)',
            }}></div>
        );
    }

export default BackgroundImage;
