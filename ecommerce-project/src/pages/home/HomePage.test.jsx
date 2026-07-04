// @vitest-environment jsdom

import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import HomePage from './HomePage';

vi.mock('axios');
vi.mock('../../components/Header', () => ({
    default: () => <div data-testid="header" />,
}));
vi.mock('../../components/Footer', () => ({
    default: () => <div data-testid="footer" />,
}));

describe('HomePage component', () => {

    let loadCart;
    beforeEach(() => {
        loadCart = vi.fn()

        axios.get.mockImplementation((url) => {
            if (url === "/api/products") {
                return (
                    Promise.resolve({
                        data: [
                            {
                                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                                rating: {
                                    stars: 4.5,
                                    count: 87
                                },
                                priceCents: 1090,
                                keywords: ["socks", "sports", "apparel"]
                            },
                            {
                                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c7",
                                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                                rating: {
                                    stars: 4.5,
                                    count: 87
                                },
                                priceCents: 1090,
                                keywords: ["socks", "sports", "apparel"]
                            }
                        ]
                    })
                )
            }

        })
    })


    it("display the products correct", async () => {
        render(<HomePage cart={[]} loadCart={loadCart} />);
        const productContainers = await screen.findAllByTestId("product-container")
        expect(productContainers.length).toBe(2)

        expect(
            within(productContainers[0]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument()

        expect(
            within(productContainers[1]).getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument()

    })

})
