import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
{/*                <CardImg top src={`/${campsite.image}`} alt={campsite.name} /> */}
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if(comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return(
                        <div key={comment.id}>{comment.text}<p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p></div>);
                })}
                <CommentForm />
            </div>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    if(props.campsite) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }

        return(
            <div />
        );
    }

    class CommentForm extends Component {

        constructor(props) {
            super(props);
    
            this.state = {
                isModalOpen: false,
                rating: '',
                author: '',
                text: '',
                touched: {
                    author: false
                }
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            alert('Current state is: ' + JSON.stringify(values));
            console.log('Current state is: ' + JSON.stringify(values));
            this.toggleModal();
        }

        render() {
            return(
                <div className="container">
                    <span className="navbar-text ml-auto">
                        <Button outline onClick={this.toggleModal}>
                            <i className="fa fa-pencil fa-lg" /> Submit Comment
                        </Button>
                    </span>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="col-md-10">
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="text">Rating</Label>
                                            <Control.select model=".rating" id="rating" name="rating"
                                                className="form-control" defaultValue="3">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author">Author</Label>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Author"
                                            className="form-control"
                                            validators={{
                                                required,
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            Component="div"
                                            messages={{
                                                required: "Required",
                                                minLength: "Must be at least 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                    /> 
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment" >Comment</Label>
                                        <Col md={10}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control"
                                        />
                                        </Col>
                                    </Row>
                                    <Button type="submit" value="submit" color="primary">Submit Comment</Button>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
             </div>
            );
        }
    }

export default CampsiteInfo;