import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateCard from "../components/card/CreateCard.jsx";
import CardService from "../services/CardService.js";
import TagService from "../services/TagService.js";

jest.mock('../services/CardService');
jest.mock('../services/TagService');

describe('CreateCard Component', () => {
    it('renders create card form', async () => {
        const tags = [
            { id: 1, name: 'Tag1' },
            { id: 2, name: 'Tag2' },
        ];

        TagService.getTags.mockResolvedValue(tags);

        render(
            <MemoryRouter>
                <CreateCard />
            </MemoryRouter>
        );

        // Wait for the asynchronous operation to complete
        await waitFor(() => {
            expect(screen.getByText('Create a New Card')).toBeInTheDocument();
            expect(screen.getByLabelText('Question:')).toBeInTheDocument();
            expect(screen.getByLabelText('Answer:')).toBeInTheDocument();
            expect(screen.getByLabelText('Tag:')).toBeInTheDocument();
        });
    });

    it('submits form and creates card', async () => {
        const createCardMock = jest.spyOn(CardService, 'createCard');

        render(
            <MemoryRouter>
                <CreateCard />
            </MemoryRouter>
        );

        // Mock user input
        fireEvent.change(screen.getByLabelText('Question:'), { target: { value: 'Test Question' } });
        fireEvent.change(screen.getByLabelText('Answer:'), { target: { value: 'Test Answer' } });
        fireEvent.change(screen.getByLabelText('Tag:'), { target: { value: '1' } });

        // Submit the form
        fireEvent.click(screen.getByText('Create Card'));

        // Wait for the asynchronous operation to complete
        await waitFor(() => {
            // Check if createCard function is called with the correct parameters
            expect(createCardMock).toHaveBeenCalledWith('Test Question', 'Test Answer', 'FIRST', '1');

            // Check if the navigation to '/cards' occurs
            expect(screen.history.action).toBe('PUSH');
            expect(screen.history.location.pathname).toBe('/cards');
        });
    });
});
