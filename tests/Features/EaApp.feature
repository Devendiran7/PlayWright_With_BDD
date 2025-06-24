Feature: EaApp automation

  @EAAPP
  Scenario Outline: Validate Login functionality
    Given User launch the EAApp application URL
    When User login with valid "<UserName>" and "<password>"

    Examples:
      | UserName | password |
      | admin    | password |

@Invalid
  Scenario Outline: Validate Emp Details 
    Given User launch the EAApp application URL
    When User login with valid "<UserName>" and "<password>"
    Then User Validates the Invalid Credentials error message

    Examples:
      | UserName | password |
      | admin1   | password231 |
