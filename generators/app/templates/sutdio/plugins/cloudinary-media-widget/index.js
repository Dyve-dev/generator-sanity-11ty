import React from 'react'
import PropTypes from 'prop-types'
import getIt from 'get-it'
import jsonResponse from 'get-it/lib/middleware/jsonResponse'
import promise from 'get-it/lib/middleware/promise'
import Button from 'part:@sanity/components/buttons/default'
import { Helmet } from 'react-helmet'

import styles from './Cats.css'
import { Boolean } from 'get-it/lib/util/global'

const request = getIt([promise(), jsonResponse()])

class Cats extends React.Component {
  static propTypes = {
    imageWidth: PropTypes.number
  }

  static defaultProps = {
    imageWidth: 600
  }

  state = {
    imageUrl: null,
    error: null
  }

  constructor(props) {
    super(props)
    document.body.addEventListener('cld-widget-ready', () => {
      if(window.cloudinary){
        this.createCloudinaryWidget();
      }
    })
    document.body.addEventListener('cld-media-ready', () => {
      if(window.cloudinary){
        this.createMedialLib();
      }
      
    })
  }

  createMedialLib = () => {
    if (window.$cldMedia || !Boolean(cloudinary.createMediaLibrary)) return
    window.$cldMedia = cloudinary.createMediaLibrary(
      {
        cloud_name: 'codebreak',
        api_key: '346629455121418',
        //username: 'john_doe@mycompany.com',
        //button_class: 'mediaBtn',
        button_caption: 'Manage'
      },
      {
        insertHandler: function(data) {
          data.assets.forEach(asset => {
            console.log('Inserted asset:', JSON.stringify(asset, null, 2))
          })
        }
      },
      document.getElementById('open-media-lib')
    )
  }

  createCloudinaryWidget = () => {
    if (window.$cldUpload || !Boolean(cloudinary.createUploadWidget)) return
    window.$cldUpload = cloudinary.createUploadWidget({
      cloudName: 'codebreak',
      sources: [ 'local', 'url']
    })
  }

  componentDidRender() {
    /* this.createMedialLib();
    this.createCloudinaryWidget(); */
  }

  openUploadWidget() {
    try {
      window.$cldUpload.open()
    } catch (err) {
      console.error(err)
    }
  }
  openMediaLib() {
    try {
      window.$cldMedia.show()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { imageUrl, error } = this.state
    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>
    }
    const { imageWidth } = this.props
    return (
      <>
        <Helmet>
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
            onLoad={(() => {
              const ev = new Event('cld-widget-ready', { bubbles: true })
              document.body.dispatchEvent(ev)
            })()}
          ></script>
          <script
            src="https://media-library.cloudinary.com/global/all.js"
            type="text/javascript"
            onLoad={(() => {
              const ev = new Event('cld-media-ready', { bubbles: true })
              document.body.dispatchEvent(ev)
            })()}
          ></script>
        </Helmet>
        <div className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>Cloudinary</h2>
          </header>
          <div className={styles.content}>
            <Button kind="simple" onClick={this.openUploadWidget}>
              Upload Images
            </Button>
          </div>
          <div className={styles.footer}>
            <Button
              bleed
              color="primary"
              kind="simple"
              id="open-media-lib"
              onClick={this.openMediaLib}
            >
              Manage
            </Button>
          </div>
        </div>
      </>
    )
  }
}

export default {
  name: 'cloudinary-media-widget',
  component: Cats
}
