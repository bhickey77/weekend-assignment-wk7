import React, { Component } from 'react';
import './Feeling.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from '../../inputStyles';

//======== Material UI ==========
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon/Icon'

import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


const mapReduxStateToProps = (reduxStore) => ({
  reduxStore
})

class Feeling extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedValue: ''
    }
  }

  handleKeyPress = event => {
    if(event.key == 'Enter'){
      console.log(`you pressed the enter key`);
      
      this.handleSubmit();
    }
  }

  componentDidMount(){
    console.log(this.props.reduxStore.feedbackReducer.feeling);
    this.setState({
      selectedValue: this.props.reduxStore.feedbackReducer.feeling
    })
  }

  handleSubmit = (event) => {
    const action = {type: 'ADD_FEELING', payload: parseInt(this.state.selectedValue, 10)};
    this.props.dispatch(action);
    window.location.href = '#/understanding';
  }

  handleChange = (event) => {
    this.setState({
      selectedValue: event.target.value
    })
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className="Feeling">
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                How are you feeling today?
              </Typography>
              <div className={classes.radioContainer}>
                <p className={classes.buttonHint}>I'm very stressed<Icon>sentiment_very_dissatisfied</Icon></p>
                <Radio
                  checked={this.state.selectedValue == '1'}
                  onChange={this.handleChange}
                  value="1"
                  name="radio-button-demo"
                  color="default"
                  aria-label="1"
                />
                <Radio
                  checked={this.state.selectedValue == '2'}
                  onChange={this.handleChange}
                  value="2"
                  name="radio-button-demo"
                  color="default"
                  aria-label="2"
                />
                <Radio
                  checked={this.state.selectedValue == '3'}
                  onChange={this.handleChange}
                  value="3"
                  name="radio-button-demo"
                  color="default"
                  aria-label="3"
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                />
                <Radio
                  checked={this.state.selectedValue == '4'}
                  onChange={this.handleChange}
                  value="4"
                  color="default"
                  name="radio-button-demo"
                  aria-label="4"
                />
                <Radio
                  checked={this.state.selectedValue == '5'}
                  onChange={this.handleChange}
                  value="5"
                  color="default"
                  name="radio-button-demo"
                  aria-label="5"
                  className={classes.size}
                  icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
                  checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
                /> 
                <p className={classes.buttonHint}>I'm feeling great!<Icon>sentiment_very_satisfied</Icon></p>
              </div>
            </CardContent>
            <CardActions onClick={this.handleSubmit} className={classes.buttonContainer}>
              <Button size="small">Next Item <Icon>trending_flat</Icon></Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(mapReduxStateToProps)
)(Feeling);

