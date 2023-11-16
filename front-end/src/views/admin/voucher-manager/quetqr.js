import React, { Component } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const oauth = require("axios-oauth-client");
const tokenProvider = require("axios-token-interceptor");

export default class QuetQRCode extends Component {
  state = {
    showCam: false,
    name: "",
    isValid: "",
    validFrom: "",
    validTo: "",
    errors: [],
  };

  validPrefix = () => {
    return this.isDcc(this.state.qrCodeContent);
  };

  isDcc = (qrCode = "") => {
    if (!qrCode || typeof qrCode !== "string") {
      return false;
    }

    const identifier = "^HC1:";

    const regex = new RegExp(`${identifier}`, "i");

    return regex.test(qrCode);
  };

  check = (qrCodeContent) => {
    const options = {};
    options.headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    const client = axios.create(options);

    const getOwnerCredentials = oauth.client(axios.create(), {
      url: "https://dcc-verifier.de/oauth/token",
      grant_type: "client_credentials",
      client_id: "45619a959cbbdac7b04abab4fa9c3a78",
      client_secret:
        "93cf32a423e0303e0110de6d3d8df0ff6e480f35e96584ff04cf3ac63567fcd2c4f7530ab3ab918c9f3fe613a14a98fd8060078a1bdc7675ce1a8a5e043b2a65",
      scope: "verify",
    });

    client.interceptors.request.use(
      oauth.interceptor(tokenProvider, getOwnerCredentials)
    );

    const documentTypes = {
      pcrTest: true,
      rapidTest: true,
      vaccination: true,
      recovery: true,
    };

    const payload = {
      certificate: qrCodeContent,
      documentTypes: documentTypes,
    };

    client
      .post("https://dcc-verifier.de/api/dcc/verify", payload)
      .then((resp) => {
        this.setState({
          isValid: String(resp.data.isValid),
          validFrom: resp.data.validFrom,
          validTo: resp.data.validTo,
          errors: resp.data.errors,
        });
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          // Request made and server responded
          console.log(error.response.data);
          this.setState({
            isValid: "false",
            validFrom: "",
            validTo: "",
            errors: error.response.data.errors,
          });
        } else {
          this.setState({
            isValid: "false",
            validFrom: "",
            validTo: "",
            errors: [{ message: "unexpeted error" }],
          });
        }
      });
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrCodeContent: data,
      });

      this.setState({ showCam: false });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  handleClick = () => {
    this.setState({ showCam: !this.state.showCam });
  };

  handleChange = (event) => {
    this.setState({ qrCodeContent: event.target.value });
  };

  handleValidate = (event) => {
    this.check(this.state.qrCodeContent);
  };

  handleClick = () => {
    this.setState({ showCam: !this.state.showCam });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.showCam
            ? " Close camera reader..."
            : " Open camera reader"}
        </button>
        {this.state.showCam ? (
          <div>
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "100%" }}
            />
          </div>
        ) : null}
        <table>
          <tbody>
            <tr>
              <td>Valid:</td>
              <td>{this.state.isValid}</td>
            </tr>
            <tr>
              <td>Valid from:</td>
              <td>{this.state.validFrom}</td>
            </tr>
            <tr>
              <td>Valid to:</td>
              <td>{this.state.validTo}</td>
            </tr>
          </tbody>
        </table>

        {this.state.errors.length > 0 && <p>Errors</p> &&
          this.state.errors.map((error, i) => (
            <div className="" key={i}>
              {error.message}
            </div>
          ))}

        <p>QR Code</p>
        <textarea
          rows="10"
          cols="50"
          value={this.state.qrCodeContent}
          onChange={this.handleChange}
        />
        <p>
          <button disabled={!this.validPrefix()} onClick={this.handleValidate}>
            Validate
          </button>
        </p>
      </div>
    );
  }
}
