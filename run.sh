#!/usr/bin/env bash
set -e

print_usage() {
    echo "Executes test cases for the given scenarios."
    echo
    echo "Usage: "
    echo "  $0 [scenarios...]"
    echo "  $0  -h|--help"
    echo
    echo "Scenarios:"
    echo "  USER                DHIS2 API - Users Module."
    echo "  DATA_ADMIN          DHIS2 API - Data Administration."
    echo "  OTHER               This needs some care, please implement."
}

function validate_input() {
  if [ "$1" == "-h" ]; then
    print_usage
    exit 0
  elif [[ "$#" < 1 ]]; then
    echo "$0 : too few arguments. It's not supported to run all scenarios at once."
    exit 1
  fi
}

function execute_test() {
    scenario=$(echo $1 | awk '{print toupper($0)}')

    case $scenario in
        USER)
            mocha modules/users/user.js --timeout 10000
            ;;

        DATA_ADMIN)
            mocha modules/data-admin/optionSet.js
            ;;

        OTHER)
            echo "This needs some care, please implement."
            ;;

        *)
            echo "Unknown scenario '$1'"
            print_usage
            exit 1
    esac
}

validate_input "$@"

for scenario in "$@"
do
    execute_test "$scenario"
done