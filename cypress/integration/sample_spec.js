/// <reference types="cypress" />
import 'cypress-react-selector';

describe('Ni Hao Numbers end to end tests', () => {
    const chinese_digits = /[零一二三四五六七八九十两千万亿兆点负兩萬億兆負]+/
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.intercept('POST', '/studyboardSetup').as('study-board-setup');
        cy.waitForReact();
    });
    const simplified_welcome_title = '准备好了吗?' 
    it('can click to resources page and back', () => {
        cy.get('.welcome-text')
        .contains(simplified_welcome_title);

        cy.get('a')
        .first()
        .contains('你 好 numbers');

        // click on the resources tab
        cy.get('a:nth-child(2')
        .contains('resources')
        .click();
        
        // ensure we are on resources tab
        cy.get('h3')
        .contains('Resources');
        // check that each h3 has an href
        cy.get('#resource-div')
        .scrollTo('bottom')
        .get('h4')
        .last()
        .contains('Conclusion');
        
        cy.get('[href="/"]')
        .click()
        .get('.welcome-text')
        .contains(simplified_welcome_title);
    });
    it('can exit after starting along with loader working', () => {
        cy.get('#how-many')
        .type('{backspace}{backspace}30');

        cy.get('#start-button')
        .click()

        cy.get('#loader')
        .should('exist');
        //.contains(/.*/);

        cy.wait('@study-board-setup');

        const exit_button = cy.get('#exit-button')
        exit_button.contains('Exit');

        exit_button.click();

        cy.get('.welcome-text')
        .contains(simplified_welcome_title);
    });

    // TODO:: test that chaning options works
    // exclusive read character, read number, listen three time each along with every existing permutation
    it('more options work (read charcter, read number, listen) exclusively', () => {

        for(let i = 0; i < 3; i++) {
            cy.get('#how-many')
            .type('{backspace}{backspace}1');

            cy.get('#more-options-button')
            .click();

            // test read character
            cy.get('#read-number')
            .click();

            cy.get('#listen')
            .click()

            cy.get('#start-button')
            .click();

            cy.wait('@study-board-setup');
            cy.get('#text-question').contains(chinese_digits);
            cy.get('#exit-button').click();
        }
        for(let i = 0; i < 3; i++) {
            cy.get('#how-many')
            .type('{backspace}{backspace}1');

            cy.get('#more-options-button')
            .click();

            // test read number 
            cy.get('#read-character')
            .click();

            cy.get('#listen')
            .click()

            cy.get('#start-button')
            .click();

            cy.wait('@study-board-setup');
            cy.get('#text-question').contains(/[-\d.]+/);
            cy.get('#exit-button').click();
        }
        for(let i = 0; i < 3; i++) {
            cy.get('#how-many')
            .type('{backspace}{backspace}1');

            cy.get('#more-options-button')
            .click();

            // test listen 
            cy.get('#read-number')
            .click();

            cy.get('#read-character')
            .click();

            cy.get('#start-button')
            .click();

            cy.wait('@study-board-setup');

            // this does not test that audio acutally plays, just that the button is there
            cy.get('#play-audio')
            .click();
            
            cy.get('#exit-button')
            .click();
        }
        
    })
    //  TODO:: figure out how to test 
    /*
    it('more options: read number and read character work', () => {
        // check permutations here, might need some consts
        let has_read_character = false;
        let has_read_number = false;
        let has_listen = false;
        // read-number read-character
        for(let i = 0; i < 50; i++) {
            cy.get('#how-many')
            .type('{backspace}{backspace}1');

            cy.get('#more-options-button')
            .click();

            cy.get('#listen')
            .click();

            cy.get('#start-button')
            .click();

            cy.wait('@study-board-setup');

            // use react to get component 
            cy.getReact('QuestionStep').
            break;
        }
    })
    */
    it('test that play audio works', () => {
        cy.get('#how-many')
        .type('{backspace}{backspace}1');

        cy.get('#more-options-button')
        .click();

        // test listen 
        cy.get('#read-number')
        .click();

        cy.get('#read-character')
        .click()

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');


        cy.get('#play-audio')
        .click();
            
        cy.getReact('QuestionStep')
        .getProps('audio.currentTime')
        .should('not.eq', 0);
    })
    it('test that all more options are false will go back to menu board', () => {
            cy.get('#more-options-button')
            .click();

            cy.get('#listen')
            .click();

            cy.get('#read-number')
            .click();

            cy.get('#read-character')
            .click();

            cy.get('#start-button')
           .click();

            cy.wait('@study-board-setup');

            cy.get('.welcome-text');

    });
    it('review button does not show when all answers are correct', () => {
        cy.get('#min-bound')
        .type('{backspace}1');

        cy.get('#max-bound')
        .type('{backspace}{backspace}1');

        cy.get('#how-many')
        .type('{backspace}{backspace}1');
        
        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click();

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');

        cy.get('#user-answer')
        .type('1');

        cy.get('#submit-button')
        .click();

        cy.get('#end-text')
        .should('exist');

        cy.get('#review-button')
        .should('not.exist');

        cy.get('#exit-to-home-button')
        .click();

        cy.get('.welcome-text')
        .should('exist');
    });
    // test that review feature works 
    it('review feature works with some answers correct', () => {
        cy.get('#more-options-button')
        .click();

        cy.get('#read-number')
        .click();

        cy.get('#min-bound')
        .type('{backspace}1');

        cy.get('#max-bound')
        .type('{backspace}{backspace}3');

        cy.get('#how-many')
        .type('{backspace}{backspace}20');

        cy.get('#start-button')
        .click();
        
        cy.wait('@study-board-setup');

        // bound from 1-3 therefore there should be a repeat 
        for(let i = 0; i < 20; i++) {
            cy.get('#user-answer')
            .type('1');
            cy.get('#submit-button')
            .click();
        }

        cy.get('#review-button')
        .click();
        // this is the first iteration in review
        cy.get('#previous-button')
        .should('be.hidden');

        cy.get('#exit-to-home-button')
        .should('exist');

        cy.get('#next-button')
        .click();

        //instance two
        cy.get('#previous-button')
        .should('be.visible');

        cy.get('#exit-to-home-button')
        .click();

        cy.get('.welcome-text');

    }); 
    // test that review feature works with writing characters
    it('review feature works with some answers correct with write characters', () => {
        cy.get('#more-options-button')
        .click();

        cy.get('#read-character')
        .click();

        cy.get('#min-bound')
        .type('{backspace}1');

        cy.get('#max-bound')
        .type('{backspace}{backspace}3');

        cy.get('#how-many')
        .type('{backspace}{backspace}20');

        cy.get('#start-button')
        .click();
        
        cy.wait('@study-board-setup');

        // bound from 1-3 therefore there should be a repeat 
        for(let i = 0; i < 20; i++) {
            cy.get('#user-answer')
            .type('一');
            cy.get('#submit-button')
            .click();
        }

        cy.get('#review-button')
        .click();
        // this is the first iteration in review
        cy.get('#previous-button')
        .should('be.hidden');

        cy.get('#exit-to-home-button')
        .should('exist');

        cy.get('#next-button')
        .click();

        //instance two
        cy.get('#previous-button')
        .should('be.visible');

        cy.get('#exit-to-home-button')
        .click();

        cy.get('.welcome-text');

    });

    // TODO:: testing alternating decimals, characters, from, to
    it('check that decimal works, simplified and traditional', () => {
        cy.get('#min-bound')
        .type('{backspace}10.3');

        cy.get('#max-bound')
        .type('{backspace}{backspace}{backspace}{backspace}20.8');

        cy.get('#decimal')
        .select('1');

        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click();

        cy.get('#start-button')
        .click();
        
        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/点/);

        cy.get('#exit-button')
        .click();

        // traditional character
        cy.get('#chinese-character-type')
        .select('tc');

        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click();

        cy.get('#start-button')
        .click();
        
        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/點/);

        cy.get('#exit-button')
        .click();

        // test number 
        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-character')
        .click();

        cy.get('#start-button')
        .click();
        
        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/./);


    });

    it('check that negative numbers work, simplified and traditional', () => {
        cy.get('#min-bound')
        .type('{backspace}-10');

        cy.get('#max-bound')
        .type('{backspace}{backspace}{backspace}{backspace}-1');
        
        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click(); 

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/^负[零一二三四五六七八九十]/ )

        cy.get('#exit-button')
        .click()
        
        // traditional character
        cy.get('#chinese-character-type')
        .select('tc');

        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click(); 

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/^負[零一二三四五六七八九十]/);

        cy.get('#exit-button')
        .click();
        
        // number as digit
        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-character')
        .click();

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/^-\d/);
    });

    // TODO:: test bounds of app
    it('testing bounds for options', () => {
        // min bound test
        cy.get('#min-bound')
        .type('{backspace}{backspace}-9999999999999.99');

        cy.get('#max-bound')
        .type('{backspace}{backspace}-9999999999999.99');

        cy.get('#how-many')
        .type('{backspace}{backspace}1');

        cy.get('#decimal')
        .select('2');

        cy.get('#chinese-character-type')
        .select('tc');

        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click(); 

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/負九兆九千九百九十九億九千九百九十九萬九千九百九十九點九九/);

        cy.get('#exit-button')
        .click();
        // max bount test
        cy.get('#max-bound')
        .type('{movetostart}{del}');

        cy.get('#min-bound')
        .type('{movetostart}{del}');

        cy.get('#more-options-button')
        .click();

        cy.get('#listen')
        .click();

        cy.get('#read-number')
        .click(); 

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup');

        cy.get('#text-question')
        .contains(/九兆九千九百九十九億九千九百九十九萬九千九百九十九點九九/);

        cy.get('#exit-button')
        .click();

        cy.get('#how-many')
        .type('{del}50')

        cy.get('#start-button')
        .click();

        cy.wait('@study-board-setup', 10000);
    })
    // TODO:: when reviewing only answers that were incorrect show up
});