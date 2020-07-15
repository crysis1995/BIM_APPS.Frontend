import React from "react";
import { Button, Image, NavDropdown } from "react-bootstrap";
import { logout_bim360 } from "./redux/operations";
import { connect } from "react-redux";
import PopupWindow from "./components/utils/PopupWindow";
import { config } from "../../config";
import { fetchAccessToken } from "./redux/operations";

class AutodeskLogin extends React.Component {
      onBtnClick = async () => {
            const resp = await fetch(
                  `${config.api_url}/Forge/threeLegged/getUrl`
            ).then((e) => e.json());

            const popup = (this.popup = PopupWindow.open(
                  "autodesk-bim360-authorization",
                  resp.url,
                  { height: 800, width: 800 }
            ));

            popup.then(
                  (data) => this.onSuccess(data),
                  (error) => this.onFailure(error)
            );
      };

      onRequest = () => {
            this.props.onRequest();
      };

      onSuccess = (data) => {
            if (!data.code) {
                  return this.onFailure(new Error("'code' not found"));
            }
            this.props.fetchAccessToken(data.code);
      };

      onFailure = (error) => {
            console.log(error);
      };

      render() {
            const args = { onClick: this.onBtnClick };

            return this.props.login_3_legged.access_token ? (
                  <NavDropdown
                        alignRight
                        title={
                              <>
                                    {this.props.user ? (
                                          <span>
                                                {`Witaj, ${this.props.user.firstName}\t`}
                                          </span>
                                    ) : null}
                                    <Image
                                          src={
                                                this.props.user &&
                                                this.props.user.profileImages
                                                      .sizeX50
                                          }
                                          width={20}
                                          height={20}
                                          roundedCircle
                                    />
                              </>
                        }
                        id="collasible-nav-dropdown"
                  >
                        <NavDropdown.Item onClick={this.props.logout_bim360}>
                              Wyloguj
                        </NavDropdown.Item>
                  </NavDropdown>
            ) : (
                  <Button {...args} variant="outline-primary" size="sm">
                        Zaloguj przez BIM360
                  </Button>
            );
      }
}

const mapStateToProps = (state) => ({
      ...state.AutodeskLogin,
});

const mapDispatchToProps = {
      fetchAccessToken,
      logout_bim360
};

export default connect(mapStateToProps, mapDispatchToProps)(AutodeskLogin);
