import React, { Component } from 'react';
import Quagga from 'quagga';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this._onDetected = this._onDetected.bind(this);
  }

  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['code_128_reader'],
        },
        locate: true,
      },
      function(err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected(result) {
    this.props.onDetected(result);
    // Xử lý kết quả quét ở đây

    // Tạm thời tắt luồng quét
    Quagga.decodeSingle(
      {
        inputStream: {
          type: 'None'
        },
      },
      () => {
        // Sau khi tắt luồng quét, gọi lại Quagga.start() để bắt đầu quét mới
        Quagga.start();
      }
    );
  }

  render() {
    return <div style={{ height: "480px" }} id="interactive" className="viewport" />;
  }
}
