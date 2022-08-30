describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		const user = {
			name: 'Esteri Testeri',
			username: 'testUser',
			password: 'secret'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')
		cy.contains('username')
		cy.contains('password')
		cy.contains('login')
	})
	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('testUser')
			cy.get('#password').type('secret')
			cy.get('#login-button').click()

			cy.contains('Esteri Testeri logged in')
		})

		it('fails with wrong credentials', function() {
			cy.get('#username').type('wrongPerson')
			cy.get('#password').type('wrongwrong')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'logged in')
		})
	})
	describe('When logged in', function() {
		beforeEach(function() {
			cy.get('#username').type('testUser')
			cy.get('#password').type('secret')
			cy.get('#login-button').click()
		})

		it('A blog can be created', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('money printer go brrr')
			cy.get('#author').type('Jerome Powell')
			cy.get('#url').type('federalreserve.gov')
			cy.get('#submit-button').click()
			cy.contains('money printer go brrr Jerome Powell')
		})
		it('A blog can be liked', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('money printer go brrr')
			cy.get('#author').type('Jerome Powell')
			cy.get('#url').type('federalreserve.gov')
			cy.get('#submit-button').click()
			cy.contains('money printer go brrr Jerome Powell')
			cy.contains('view').click()
			cy.contains('likes 0')
			cy.contains('like').click()
			cy.contains('likes 1')
		})

		it('A blog can deleted', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('money printer go brrr')
			cy.get('#author').type('Jerome Powell')
			cy.get('#url').type('federalreserve.gov')
			cy.get('#submit-button').click()
			cy.contains('money printer go brrr Jerome Powell')
			cy.contains('view').click()
			cy.contains('remove').click()
			cy.get('html').should('not.contain', 'money printer go brrr Jerome Powell')
		})

		it('Blogs are ordered by likes', function() {
			cy.contains(/^new blog$/).click()
			cy.get('#title').type('Second Best')
			cy.get('#author').type('Juha Mieto')
			cy.get('#url').type('mietaa.fi')
			cy.get('#submit-button').click()

			cy.contains(/^new blog$/).click()
			cy.get('#title').type('Third Rock')
			cy.get('#author').type('Maa Pallo')
			cy.get('#url').type('nasa.gov')
			cy.get('#submit-button').click()

			cy.contains(/^new blog$/).click()
			cy.get('#title').type('Best Blog')
			cy.get('#author').type('George Best')
			cy.get('#url').type('manutd.com')
			cy.get('#submit-button').click()

			cy.contains('Best Blog George Best').parent().find('button').contains('view').click()
			cy.contains('Second Best Juha Mieto').parent().find('button').contains('view').click()
			cy.contains('Third Rock Maa Pallo').parent().find('button').contains('view').click()

			cy.contains('Best Blog George Best').parent().find('button').contains('like').click()
			cy.contains('Second Best Juha Mieto').parent().find('button').contains('like').click()
			cy.contains('Best Blog George Best').parent().find('button').contains('like').click()
			cy.wait(500)

			cy.get('.blogs').eq(0).should('contain', 'Best Blog George Best')
			cy.get('.blogs').eq(1).should('contain', 'Second Best Juha Mieto')
			cy.get('.blogs').eq(2).should('contain', 'Third Rock Maa Pallo')
		})
	})
})