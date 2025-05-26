import {
  PasswordChecker,
  PasswordErrors,
} from '../../app/pass_checker/passwordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('password with less than 8 chars is invalid', () => {
    // Arrange
    const input = '1234567';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(PasswordErrors.SHORT);
  });

  it('Password with more than 8 chars is invalid', () => {
    // Arrange
    const input = '12345678';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('Password with no upper case letter is invalid', () => {
    // Arrange
    const input = '1234abcd';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('Password with upper case letter is valid', () => {
    // Arrange
    const input = '1234ABCD';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('Password with no lower case letter is invalid', () => {
    // Arrange
    const input = '1234ABCD';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result.valid).toBe(false);
    expect(result.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Password with lower case letter is invalid', () => {
    // Arrange
    const input = '1234abcd';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Complex password is valid', () => {
    // Arrange
    const input = '1234abCD';

    // Act
    const result = sut.checkPassword(input);

    // Assert
    expect(result.valid).toBe(true);
    expect(result.reasons).toHaveLength(0);
  });
});
