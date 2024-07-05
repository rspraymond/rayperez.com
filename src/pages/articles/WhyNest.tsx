import React from 'react'
import BlogPost from '../../components/BlogPost.tsx'
import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function formatCodeString(input: string): string {
  if (!input) {
    return ''
  }

  let formatted = ''
  let indentLevel = 0
  const indent = '\t'
  const lines = input.split(/(?<=;|\{|\})/)

  lines.forEach((line) => {
    line = line.trim()

    if (line.endsWith('}')) {
      indentLevel--
    }

    if (line) {
      formatted += indent.repeat(indentLevel) + line + '\n'
    }

    if (line.endsWith('{')) {
      indentLevel++
    }
  })

  return formatted
}

const WhyNest = (): React.ReactElement => {
  return (
    <BlogPost
      title='Why I Choose NestJS'
      author='Raymond Perez'
      date='2024-07-04'
      children={
        <React.Fragment>
          <Typography variant='h3' gutterBottom>
            Key Takeaways
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="NestJS's Structured Approach"
                secondary="NestJS's structured and opinionated nature, along with its modular architecture, makes it an excellent choice for large-scale applications. It provides a clear path for organizing code, which improves maintainability and scalability."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='TypeScript and Dependency Injection'
                secondary='NestJS leverages TypeScript to enhance the developer experience with better type safety and autocompletion. It also implements Dependency Injection out of the box, promoting loose coupling and enhancing code testability.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Comprehensive Documentation and Built-in Features'
                secondary='NestJS offers comprehensive, well-structured documentation and a growing community for support. It also comes with numerous built-in features that enforce best practices, saving developers the effort of manual implementation.'
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4 }} />

          <Typography variant='h6' gutterBottom>
            I. Introduction
          </Typography>
          <Typography paragraph>
            NestJS is a progressive Node.js framework that has been gaining traction in the
            developer community for its robustness and flexibility. It's built with TypeScript and
            combines elements of Object-Oriented Programming (OOP), Functional Programming (FP), and
            Functional Reactive Programming (FRP). The purpose of this post is to delve into the
            reasons why I, as a developer, choose NestJS over other frameworks.
          </Typography>

          <Typography variant='h6' gutterBottom>
            II. Structured and Opinionated Framework
          </Typography>
          <Typography paragraph>
            One of the primary reasons I choose NestJS is its structured and opinionated nature.
            NestJS provides a clear blueprint for organizing code, which is particularly beneficial
            for large-scale projects. It encourages developers to write scalable, maintainable code
            by following specific conventions and guidelines. Unlike unopinionated frameworks like
            Express, which leave a lot of decisions up to the developer, NestJS provides a clear
            path forward. This can significantly speed up the development process and reduce the
            risk of errors.
          </Typography>
          <Box component='pre'>
            <SyntaxHighlighter language='typescript' style={materialDark}>
              {formatCodeString(`app.get('/', function (req, res) { res.send('Hello World!')})`)}
            </SyntaxHighlighter>
          </Box>
          <Typography paragraph>
            While in NestJS, the same functionality would be structured like this:
          </Typography>
          <Box component='pre'>
            <SyntaxHighlighter language='typescript' style={materialDark}>
              {formatCodeString(
                `@Controller()\nexport class AppController {\n\t@Get()\n\tgetHello(): string {\n\t\treturn 'Hello World!';\n\t}\n}`,
              )}
            </SyntaxHighlighter>
          </Box>
          <Typography paragraph>
            The NestJS version is more verbose, but it's also more structured and easier to
            understand, especially when the application starts to grow.
          </Typography>

          <Typography variant='h6' gutterBottom>
            III. TypeScript Integration
          </Typography>
          <Typography paragraph>
            Another compelling reason to choose NestJS is its seamless integration with TypeScript.
            TypeScript, a statically typed superset of JavaScript, offers several advantages for
            server-side development, including better type safety, improved autocompletion, and
            easier refactoring. NestJS leverages TypeScript to enhance the developer experience. For
            instance, it uses decorators, a TypeScript feature, to annotate and modify classes and
            class members. This makes the code more expressive and easier to reason about.
          </Typography>
          <Box component='pre'>
            <SyntaxHighlighter language='typescript' style={materialDark}>
              {formatCodeString(
                `@Controller('cats')\nexport class CatsController { constructor(private readonly catsService: CatsService) {} @Get()\n\tfindAll(): Cat[] { return this.catsService.findAll(); } }`,
              )}
            </SyntaxHighlighter>
          </Box>
          <Typography paragraph>
            In this code snippet, `@Controller('cats')` and `@Get()` are decorators that tell NestJS
            how to handle HTTP requests. The `private readonly catsService: CatsService` syntax is a
            TypeScript feature that declares and assigns a class property in one go. This kind of
            integration makes NestJS a joy to work with.
          </Typography>

          <Typography variant='h6' gutterBottom>
            IV. Dependency Injection
          </Typography>
          <Typography paragraph>
            Dependency Injection (DI) is a design pattern that allows a class to receive
            dependencies from an external source rather than creating them itself. This pattern is
            incredibly beneficial in large-scale applications, as it promotes loose coupling and
            enhances code maintainability and testability. NestJS implements DI out of the box,
            using it extensively throughout its core. This makes it easier to manage dependencies
            and write testable, reusable code.
          </Typography>
          <Box component='pre'>
            <SyntaxHighlighter language='typescript' style={materialDark}>
              {formatCodeString(
                `@Injectable() export class CatsService { constructor(private readonly catRepository: CatRepository) {} findAll(): Cat[] { return this.catRepository.findAll(); } }`,
              )}
            </SyntaxHighlighter>
          </Box>
          <Typography paragraph>
            In this code snippet, `CatsService` depends on `CatRepository` to retrieve data. Instead
            of instantiating `CatRepository` within `CatsService`, it's injected into `CatsService`
            through the constructor. This makes it easy to swap out `CatRepository` with a mock
            version for testing or a different implementation for different environments.
          </Typography>

          <Typography variant='h6' gutterBottom>
            V. Modularity and Scalability
          </Typography>
          <Typography paragraph>
            NestJS's modular architecture is another reason why I prefer it over other frameworks.
            In NestJS, code is organized into modules, which are single-responsibility parts of the
            application. This approach promotes separation of concerns and makes the codebase easier
            to manage, especially for large teams and projects. Moreover, NestJS's modularity
            enhances its scalability. As your project grows, you can easily add or remove modules
            without affecting the rest of the application. This is a significant advantage over
            monolithic architectures, where changes to one part of the codebase can have
            far-reaching effects.
          </Typography>
          <Box component='pre'>
            <SyntaxHighlighter language='typescript' style={materialDark}>
              {formatCodeString(
                `@Module(\n{ imports: [DatabaseModule],\nproviders: [CatsService, ...catsProviders],\ncontrollers: [CatsController],\n})\nexport class CatsModule {}`,
              )}
            </SyntaxHighlighter>
          </Box>
          <Typography paragraph>
            In this code snippet, `CatsModule` is a module that depends on `DatabaseModule`. It
            provides `CatsService` and `catsProviders` (which could be additional services or
            repositories) and uses `CatsController` to handle HTTP requests. This clear separation
            of responsibilities makes the code easier to understand and maintain.
          </Typography>

          <Typography variant='h6' gutterBottom>
            VI. Comprehensive Documentation and Community Support
          </Typography>
          <Typography paragraph>
            Good documentation is crucial for developer productivity and onboarding. It's one of the
            first things I look at when evaluating a new technology. NestJS shines in this regard,
            offering comprehensive, well-structured documentation that covers everything from basic
            concepts to advanced topics. The NestJS community is also a valuable resource. There are
            numerous tutorials, blog posts, and StackOverflow answers available to help you overcome
            any challenges you might encounter. The community is active and growing, which is a good
            sign of a healthy ecosystem. Whether you're a beginner just starting out with NestJS or
            an experienced developer looking to deepen your knowledge, you'll find the documentation
            and community support invaluable.
          </Typography>

          <Typography variant='h6' gutterBottom>
            VII. Built-in Features and Best Practices
          </Typography>
          <Typography paragraph>
            NestJS comes with a plethora of built-in features that make developers' lives easier.
            These include validation, logging, exception handling, and more. These features not only
            save you the effort of implementing them yourself but also ensure that you're following
            best practices. For example, NestJS provides a built-in exception filter that
            automatically sends appropriate HTTP responses based on the exceptions thrown in your
            application.
          </Typography>
          <Box component='pre'>
            <SyntaxHighlighter language='typescript' style={materialDark}>
              {formatCodeString(
                `@Post()\nasync create(@Body() createCatDto: CreateCatDto) { if (!createCatDto.name) { throw new BadRequestException('Name is required'); } // ... }`,
              )}
            </SyntaxHighlighter>
          </Box>
          <Typography paragraph>
            In this code snippet, if the `name` property is missing from the request body, a
            `BadRequestException` is thrown. NestJS's built-in exception filter catches this
            exception and sends a 400 Bad Request response to the client. In contrast, implementing
            this kind of functionality in unopinionated frameworks like Express can be a lot more
            work. You'd have to manually check for errors, construct the appropriate HTTP responses,
            and ensure that your approach is consistent across your entire application. With NestJS,
            these best practices are built in, so you can focus on writing your business logic.
          </Typography>

          <Typography variant='h6' gutterBottom>
            VIII. Ease of Onboarding for New Developers
          </Typography>
          <Typography paragraph>
            The structured nature of NestJS, combined with its comprehensive documentation, makes it
            easy for new developers to get up to speed. When a new developer joins a project, they
            can quickly understand how the code is organized and where to find specific
            functionality. This is a significant advantage for teams that are growing or have a high
            turnover rate. Furthermore, because NestJS enforces best practices, new developers are
            guided towards writing high-quality code. They don't have to guess how to structure
            their code or which patterns to follow; NestJS provides clear guidelines for these. For
            teams with varying levels of experience, NestJS can help level the playing field. Junior
            developers can learn from the framework's best practices, while senior developers can
            appreciate the flexibility and power that NestJS offers.
          </Typography>

          <Typography variant='h6' gutterBottom>
            IX. Addressing Common Criticisms
          </Typography>
          <Typography paragraph>
            Like any technology, NestJS has its critics. Some developers argue that the framework is
            too complex and has a steep learning curve. Others complain about the amount of
            boilerplate code required and the perceived overhead of its structured approach. While
            these criticisms have some merit, there are strategies to mitigate these issues. For
            instance, the learning curve can be eased by gradually introducing NestJS into your
            projects, rather than trying to adopt it all at once. You can start by using NestJS for
            a small part of your application and then expand its usage as you become more
            comfortable with it. As for the boilerplate code, it's important to remember that this
            is a trade-off for the structure and maintainability that NestJS provides. The
            boilerplate can be reduced by using NestJS's CLI to generate code, and the perceived
            overhead can be offset by the productivity gains from having a well-organized codebase.
            In the end, whether these criticisms are deal-breakers depends on your specific needs
            and preferences. For many developers, myself included, the benefits of NestJS far
            outweigh these potential drawbacks.
          </Typography>

          <Typography variant='h6' gutterBottom>
            X. Conclusion
          </Typography>
          <Typography paragraph>
            In conclusion, I choose NestJS for its structured and opinionated nature, TypeScript
            integration, dependency injection, modularity, comprehensive documentation, built-in
            features, and ease of onboarding for new developers. These features make NestJS a
            powerful, flexible framework that's well-suited for a wide range of projects and teams.
            While NestJS does have a learning curve and requires some boilerplate code, these issues
            can be mitigated with the right approach. The benefits of using NestJS, such as improved
            code maintainability and developer productivity, are well worth the initial investment.
            Whether you're a solo developer working on a personal project or part of a large team
            building a complex application, I highly recommend giving NestJS a try. It might just
            become your go-to framework for server-side development, as it has become mine.
          </Typography>

          <Typography variant='h5' gutterBottom>
            Frequently Asked Questions
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary='What is NestJS?'
                secondary="NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It's built with TypeScript and combines elements of Object-Oriented Programming (OOP), Functional Programming (FP), and Functional Reactive Programming (FRP)."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Why choose NestJS over other frameworks?'
                secondary='NestJS provides a structured and opinionated framework, making it easier to maintain and scale large applications. It integrates seamlessly with TypeScript for better developer experience and uses Dependency Injection for managing dependencies. NestJS also has comprehensive documentation and a growing community for support.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Is NestJS suitable for beginners?'
                secondary='Yes, NestJS is suitable for beginners. While it has a learning curve, its comprehensive documentation and structured approach make it easier for new developers to get up to speed. NestJS also enforces best practices, guiding beginners towards writing high-quality code.'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='What are some criticisms of NestJS?'
                secondary='Some developers find NestJS complex and say it has a steep learning curve. Others complain about the amount of boilerplate code required. However, these issues can be mitigated with gradual adoption and using the NestJS CLI to generate code.'
              />
            </ListItem>
          </List>
        </React.Fragment>
      }
    />
  )
}

export default WhyNest
