from sign.activities.message.models import MessageActivity
from sign.activities.repositories import ActivityRepository
from sign.boot import boot
from sign.cases.models import Case
from sign.cases.repositories import CaseRepository
from sign.users.models import User
from sign.users.repositories import UserRepository
#from sign.signing.models import SigningActivity
#from sign.documents.models import Document


def main():
    activities = ActivityRepository()
    users = UserRepository()
    cases = CaseRepository()

    riku = User.create(
        display_name='Riku Tiivola',
        email="riku@example.com",
        company_name="Tilaajavastuu",
        image_url="images/lucas.png",
    )
    mats = User.create(
        display_name='Mats Holm',
        email="mats@example.com",
        company_name="Tilaajavastuu",
        image_url="images/lucas.png",
    )
    per = User.create(
        display_name='Per Gustafsson',
        email="per@example.com",
        company_name="Tilaajavastuu",
        image_url="images/lucas.png",
    )
    sami = User.create(
        display_name='Sami Ojanen',
        email="sami@example.com",
        company_name="Tilaajavastuu",
        image_url="images/lucas.png",
    )
    klaus = User.create(
        display_name='Klaus Mäki',
        email="klaus@example.com",
        company_name="Tilaajavastuu",
        image_url="images/lucas.png",
    )

    case1 = Case.create(title='Contract for EBP Site B construction 2017')

    ma1 = MessageActivity.create(
        is_root=True,
        case_id=case1.id,
        sent_from=riku.display_name,
        to=[sami.display_name],
        text="This is root message",
    )

    ma11 = MessageActivity.create(
        case_id=case1.id,
        parent_id=ma1.id,
        sent_from=sami.display_name,
        to=[per.display_name],
        text="This is a child reply message",
    )

    ma12 = MessageActivity.create(
        case_id=case1.id,
        parent_id=ma1.id,
        sent_from=klaus.display_name,
        to=[mats.display_name],
        text="This is a second child reply message",
    )

    ma111 = MessageActivity.create(
        case_id=case1.id,
        parent_id=ma11.id,
        sent_from=per.display_name,
        to=[mats.display_name],
        text="This is a grandchild reply message",
    )

    #signing_activity = SigningActivity(
    #    sent_by=riku,
    #    text=(
    #        "Please sign the attached contract. Work can start immediately "
    #        "once the contract has been signed."
    #    ),
    #    posted_to=[mats, per, sami, klaus],
    #    attachments=[
    #        Document(
    #            filename='EBP Site B construction 2017.pdf',
    #            is_master=True,
    #        ),
    #        Document(
    #            filename='Common terms.pdf',
    #        ),
    #    ]
    #)

    activities.save([ma1, ma11, ma12, ma111])
    users.save([riku, mats, per, sami, klaus])
    cases.save([case1])


if __name__ == '__main__':
    boot()
    main()
