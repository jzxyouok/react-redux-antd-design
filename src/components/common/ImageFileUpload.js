import React from 'react';
import { Upload, Icon, message,notification } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isGIF = file.type === 'image/gif';
  
  if (!isJPG && !isPNG && !isGIF) {
    message.error('仅支持JPG、PNG、GIF格式的图片上传!');
  }
  const isLtSize = file.size / 1024 / 1024 < 5;
  if (!isLtSize) {
    message.error('请确认图片文件小于 5MB!');
  }
  return (isJPG || isPNG || isGIF) && isLtSize;
}
/******这个上传控件，仅用来做单图片文件上传******/
export default class ImageFileUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        loopsRemaining: this.props.maxLoops,
        width: this.props.width,
        height: this.props.height,
        action: "/filesys/uploadImageGetWithThumb",
        imageUrl: this.props.imageUrl
    };
  }
	
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      //getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      
      const fileInfo = info.file.response.fileInfos[0];
      
      const thumbImage = fileInfo.thumbImage.fileId;
      const lowQualityImage = fileInfo.lowQualityImage.fileId;;
      const fileImage = fileInfo.fileImage.fileId;
      
      //回调函数，给父组件赋值
      const onDone = this.props.onDone;
      onDone({thumb:thumbImage,lowQuality:lowQualityImage,imageUrl:fileImage});
      
      if(thumbImage !== undefined && thumbImage !== ''){
      	this.setState({imageUrl:"http://192.168.1.130/"+thumbImage});
      }else if(fileImage !== undefined && fileImage !== ''){
      	this.setState({imageUrl:"http://192.168.1.130/"+fileImage});
      }
      notification.open({
				type:'success',
		    message: info.file.response.msg
			});
	  }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        style={{ width:this.state.width + "px",height:this.state.height + "px", display:'block', border:'1px dashed #d9d9d9', borderRadius:'6px', cursor:'pointer' }}
        name="iamgefile"
        showUploadList={false}
        action={this.state.action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} role="presentation" style={{ width: (this.state.width - 2) + "px",height: (this.state.height - 2) + "px" }}/> :
            <Icon type="upload" style={{display: 'inline',lineHeight:this.state.height + "px",verticalAlign: 'middle',fontSize: '28px',color: '#999'}} ></Icon>
        }
      </Upload>
    );
  }
}
