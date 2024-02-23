import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardList from './CardList';
import CardService from '../../services/CardService';

jest.mock('../../services/CardService');

describe('CardList Component', () => {
    it('renders CardList component correctly', async () => {
        const mockCards = [
            { id: 1, category: 'TODO' },
            { id: 2, category: 'TODO' },
        ];

        CardService.getCards.mockResolvedValueOnce(mockCards);

        render(<CardList />);

        await waitFor(() => {
            expect(screen.getByText('Créer une fiche')).toBeInTheDocument();
            expect(screen.getByText('Card List')).toBeInTheDocument();

            mockCards.forEach((card) => {
                expect(screen.getByText(card.id)).toBeInTheDocument();
            });

            expect(screen.queryByText('Aucune carte')).not.toBeInTheDocument();
        });
    });
});
