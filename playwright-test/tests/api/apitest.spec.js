import { test, expect } from '@playwright/test'
const { overwrittenTest } = require('../../fixtures');

overwrittenTest.describe.parallel('API Testing', () => {

    const baseUrl = 'https://reqres.in/api'
    
    overwrittenTest('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3` )
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
    })

    overwrittenTest( 'Simple API Test - Assert Invalid Endpoint', async ({request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    overwrittenTest('GET Request - Get User Detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George') 
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.email).toBeTruthy()
    })
})