import React, { Component } from 'react';
import styled from '@emotion/styled';
import YoutubeEmbedVideo from 'youtube-embed-video';
import R from 'ramda';

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 2;
`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [], // { videoId: String, answer: String }
      currentCard: 0,
      answerInput: "",
      videoIdInput: "",
      answersHidden: false,
      showAnswer: false,
    };

    this.addCard = this.addCard.bind(this);
    this.updateAnswerInput = this.updateAnswerInput.bind(this);
    this.updateVideoIdInput = this.updateVideoIdInput.bind(this);
    this.toggleAnswers = this.toggleAnswers.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.next = this.next.bind(this);
  }

  addCard() {
    this.setState(state => {
      const cards = [
        ...state.cards,
        { videoId: this.state.videoIdInput, answer: this.state.answerInput },
      ];

      return {
        cards: this.shuffle(cards.slice()),
        answerInput: '',
        videoIdInput: '',
      }
    });
  }

  showAnswer() {
    this.setState({
      showAnswer: true,
    });
  }

  updateAnswerInput(event) {
    this.setState({
      answerInput: event.target.value,
    });
  }

  updateVideoIdInput(event) {
    this.setState({
      videoIdInput: event.target.value,
    });
  }

  toggleAnswers() {
    this.setState(state => ({
      answersHidden: !state.answersHidden,
    }))
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  next() {
    this.setState(state => ({
      currentCard: (state.currentCard + 1) % (state.cards.length),
      showAnswer: false,
    }));
  }

  render() {
    return (
      <div>
        <h1>
          Youtube Flashcards
        </h1>
        <Container>
          <Left>
            {this.state.answersHidden ? null : this.state.cards.map(card => (
              <div key={card.videoId}>
                {card.videoId} | {card.answer}
              </div>
            ))}
            <br />
            <button onClick={this.toggleAnswers}>Toggle Answers</button>
            <br />
            <label>
              YouTube Video ID
              <input value={this.state.videoIdInput} onChange={this.updateVideoIdInput} />
            </label>
            <br />
            <label>
              Answer
              <input value={this.state.answerInput} onChange={this.updateAnswerInput} />
            </label>
            <button onClick={this.addCard}>Add</button>
          </Left>
          <Right>
            {this.state.cards[this.state.currentCard] ? (
               <div>
                 <YoutubeEmbedVideo videoId={this.state.cards[this.state.currentCard].videoId} />
                 <br />
                 {this.state.showAnswer ? (
                    this.state.cards[this.state.currentCard].answer
                 ) : null}
               </div>
            ) : null}
            <button onClick={this.showAnswer}>Show Answer</button>
            <button onClick={this.next}>Next</button>
          </Right>
        </Container>
      </div>
    );
  }
}

export default App;
